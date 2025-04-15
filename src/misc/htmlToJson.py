import os
import pandas as pd
import json
from bs4 import BeautifulSoup

# Define directories
html_dir = 'public/spec/schedule'
output_dir = 'output'

print(f"Starting conversion from {html_dir} directory...")

def read_html_with_encoding(filepath):
    """Try reading HTML file with utf-8, fallback to big5 if needed."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except UnicodeDecodeError:
        with open(filepath, 'r', encoding='big5', errors='ignore') as f:
            return f.read()

def parse_fallback_html(html_filepath):
    """Fallback parser for HTML files that do not contain a proper table."""
    html_content = read_html_with_encoding(html_filepath)
    soup = BeautifulSoup(html_content, 'html.parser')
    body = soup.find('body')
    if not body:
        return []
    text = body.get_text(separator='\n')
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    records = []
    for line in lines:
        # Try to parse lines that look like: "12/31 Paper 錦芬 SIG08_AppProp: All-Pairs Appearance-Space Edit Propagation"
        # or fallback to old logic if not matched
        # Try to extract Date, Topic, Speaker, Title
        import re
        # Pattern: Date Topic Speaker Title (Title may contain ':')
        m = re.match(r'^(\d{1,2}/\d{1,2})\s+(\S+)\s+(\S+)\s*[:：]?\s*(.+)$', line)
        if m:
            date, topic, speaker, title = m.groups()
            record = {
                "Date": date,
                "Topic": topic,
                "Speaker": speaker,
                "Title": title
            }
            records.append(record)
        elif ':' in line:
            # Fallback: treat as title only
            record = {
                "Date": "",
                "Topic": "Paper",
                "Speaker": "",
                "Title": line.strip()
            }
            records.append(record)
    return records

def parse_2023_html(html_filepath):
    """Parse the new 2023 HTML format with div-based schedule."""
    html_content = read_html_with_encoding(html_filepath)
    soup = BeautifulSoup(html_content, 'html.parser')
    records = []
    for content_div in soup.find_all("div", class_="content"):
        date = content_div.find("div", class_="content_date")
        topic = content_div.find("div", class_="content_topic")
        speaker = content_div.find("div", class_="content_speaker")
        title = content_div.find("div", class_="content_title")
        records.append({
            "Date": date.get_text(strip=True) if date else "",
            "Topic": topic.get_text(strip=True) if topic else "",
            "Speaker": speaker.get_text(strip=True) if speaker else "",
            "Title": title.get_text(strip=True) if title else "",
        })
    return records

# Loop through the years
for year in range(2008, 2026):  # 2026 is exclusive
    html_filename = f'Schedule{year}.htm'
    html_filepath = os.path.join(html_dir, html_filename)
    json_filename = f'schedule{year}.json'
    json_filepath = os.path.join(output_dir, json_filename)

    if os.path.exists(html_filepath):
        print(f"Processing {html_filepath}...")
        try:
            # Special handling for 2023 new format
            if year == 2023:
                records = parse_2023_html(html_filepath)
                if records:
                    with open(json_filepath, 'w', encoding='utf-8') as f:
                        json.dump(records, f, ensure_ascii=False, indent=4)
                    print(f"2023 new format conversion succeeded for {json_filepath}")
                else:
                    print(f"No recognizable data found in {html_filepath}")
                continue
            # Try to read HTML tables using pandas
            try:
                dfs = pd.read_html(html_filepath, attrs={'class': 'Paper_Table'}, encoding='utf-8', header=0, keep_default_na=False)
            except ValueError:
                # Try Big5 if utf-8 fails
                dfs = pd.read_html(html_filepath, attrs={'class': 'Paper_Table'}, encoding='big5', header=0, keep_default_na=False)
            if dfs:
                df = dfs[0]
                df.columns = [str(col).strip() for col in df.columns]
                expected_columns = ["Date", "Topic", "Speaker", "Title"]
                # If columns are not as expected, try to rename or reorder
                if list(df.columns) != expected_columns:
                    print(f"Warning: Column names in {html_filepath} ({list(df.columns)}) differ from expected {expected_columns}. Using found names.")
                    # Try to align columns if possible
                    for col in expected_columns:
                        if col not in df.columns:
                            df[col] = ""
                    # Only keep expected columns if present, else keep all
                    df = df[[col for col in expected_columns if col in df.columns] + [col for col in df.columns if col not in expected_columns]]
                    # If still not matching, pad missing columns
                    for col in expected_columns:
                        if col not in df.columns:
                            df[col] = ""
                    df = df[expected_columns]
                # Clean up <br> and whitespace in Title column
                if "Title" in df.columns:
                    df["Title"] = df["Title"].astype(str).str.replace(r'<br\s*/?>', '\n', regex=True).str.strip()
                json_data = df.to_json(orient='records', indent=4, force_ascii=False)
                with open(json_filepath, 'w', encoding='utf-8') as f:
                    f.write(json_data)
                print(f"Successfully converted to {json_filepath}")
            else:
                print(f"Warning: No table with class='Paper_Table' found in {html_filepath}")
                # Fallback: try to parse as plain text
                records = parse_fallback_html(html_filepath)
                if records:
                    with open(json_filepath, 'w', encoding='utf-8') as f:
                        json.dump(records, f, ensure_ascii=False, indent=4)
                    print(f"Fallback conversion succeeded for {json_filepath}")
                else:
                    print(f"No recognizable data found in {html_filepath}")
        except ValueError as e:
            # Catch errors like "No tables found"
            print(f"Error parsing tables in {html_filepath}: {e}")
            # Fallback: try to parse as plain text
            records = parse_fallback_html(html_filepath)
            if records:
                with open(json_filepath, 'w', encoding='utf-8') as f:
                    json.dump(records, f, ensure_ascii=False, indent=4)
                print(f"Fallback conversion succeeded for {json_filepath}")
            else:
                print(f"No recognizable data found in {html_filepath}")
        except Exception as e:
            print(f"Error processing {html_filepath}: {e}")
    else:
        print(f"File not found: {html_filepath}, skipping.")

print("Conversion process finished.")