import json
from bs4 import BeautifulSoup
import re
import os

# Load the XML/HTML content from the file
try:
    with open('c:\\Users\\MingRay\\cgm-lab-website\\src\\misc\\info.xml', 'r', encoding='utf-8') as f:
        xml_content = f.read()
except FileNotFoundError:
    print("Error: info.xml not found in the specified path.")
    exit()
except Exception as e:
    print(f"Error reading file: {e}")
    exit()


soup = BeautifulSoup(xml_content, 'html.parser')

research_data = []

# Find all table rows containing research items (skip header rows)
# Assuming relevant rows have align="center" and contain the expected structure
table = soup.find('table', {'width': '950'})
if not table:
    print("Error: Could not find the main table.")
    exit()

tbody = table.find('tbody')
if not tbody:
    print("Error: Could not find tbody.")
    exit()

# Find relevant rows - those with align="center" and typically 6 td children
# Skip the first few non-data rows
rows = tbody.find_all('tr', {'align': 'center'}, recursive=False)

for row in rows:
    cols = row.find_all('td', recursive=False)
    # Ensure the row has the expected structure (image td + text td)
    if len(cols) == 6:
        try:
            img_td = cols[2]
            text_td = cols[3]

            # Extract image and link
            img_tag = img_td.find('img')
            a_tag = img_td.find('a')
            image_src = img_tag['src'].replace('\\', '/') if img_tag and 'src' in img_tag.attrs else None
            link = a_tag['href'].replace('\\', '/') if a_tag and 'href' in a_tag.attrs else None

            # Extract text details
            text_div = text_td.find('div', class_='textStyle')
            if text_div:
                # Get all meaningful text snippets, stripping whitespace
                # stripped_strings handles text across multiple tags better
                text_parts = list(text_div.stripped_strings)

                if text_parts:
                    title = text_parts[0] # First string is usually the title
                    year = None
                    authors = []

                    # Find the year (usually the last numeric part)
                    for i in range(len(text_parts) - 1, 0, -1):
                        part = text_parts[i]
                        # Simple check for a 4-digit year
                        if re.fullmatch(r'\d{4}', part):
                            year = part
                            # Authors are parts between title and year
                            authors = [p for p in text_parts[1:i] if p]
                            break
                        # Handle cases like "周家愷(D9809101)" before the year
                        match = re.search(r'\((\w\d+)\)', part)
                        if match:
                            continue # Skip student ID parts if they interfere

                    # Fallback if year wasn't found above (e.g., if last element wasn't year)
                    if year is None and re.fullmatch(r'\d{4}', text_parts[-1]):
                         year = text_parts[-1]
                         authors = [p for p in text_parts[1:-1] if p]

                    # Clean up authors list (remove potential duplicates or empty strings)
                    authors = [a.strip() for a in authors if a.strip()]

                    research_item = {
                        "image_src": image_src,
                        "link": link,
                        "title": title.strip(),
                        "authors": authors,
                        "year": year.strip() if year else None
                    }
                    research_data.append(research_item)
            else:
                 # Handle cases where the structure might differ slightly, like the 7th item
                 text_div_alternative = text_td.find('div', recursive=False) # Find first div if no class
                 if text_div_alternative:
                    text_parts = list(text_div_alternative.stripped_strings)
                    if text_parts:
                        title = text_parts[0]
                        year = None
                        authors = []
                        if re.fullmatch(r'\d{4}', text_parts[-1]):
                            year = text_parts[-1]
                            authors = [p for p in text_parts[1:-1] if p]

                        authors = [a.strip() for a in authors if a.strip()]

                        research_item = {
                            "image_src": image_src,
                            "link": link,
                            "title": title.strip(),
                            "authors": authors,
                            "year": year.strip() if year else None
                        }
                        research_data.append(research_item)


        except Exception as e:
            print(f"Skipping row due to error: {e}")
            print(f"Problematic row: {row.prettify()}") # Print row causing issues

# Convert the list of dictionaries to JSON
json_output = json.dumps(research_data, indent=2, ensure_ascii=False)

# Save the JSON output to research.json
try:
    output_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'research.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(json_output)
    print("Successfully converted XML to JSON and saved to research.json")
except Exception as e:
    print(f"Error writing JSON file: {e}")

# Optionally print the JSON to console
# print(json_output)