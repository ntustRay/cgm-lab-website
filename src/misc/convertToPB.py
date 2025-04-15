import re
import json

def extract_section(text, marker):
    """Extract the <ul>...</ul> section after a marker image."""
    m = re.search(rf'{marker}.*?<ul>(.*?)</ul>', text, re.DOTALL)
    return m.group(1) if m else ""

def parse_li_items(section):
    """Parse <li>...</li> items from a section."""
    return re.findall(r'<li.*?>(.*?)</li>', section, re.DOTALL)

def clean_html_tags(text):
    """Remove HTML tags and extra whitespace."""
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def parse_journal_li(li):
    # Index
    idx = None
    idx_m = re.match(r'\(?(\d+)\)?', li)
    if idx_m:
        idx = int(idx_m.group(1))
    # Title and link
    title = None
    link = None
    title_m = re.search(r'<a[^>]*href="([^"]*)">["“](.*?)["”]</a>', li)
    if title_m:
        link = title_m.group(1).strip()
        title = title_m.group(2).strip()
    else:
        # fallback: try to get title in quotes
        title_m = re.search(r'["“](.*?)["”]', li)
        if title_m:
            title = title_m.group(1).strip()
    # Authors: after </a>, before next <br>
    authors = None
    authors_m = re.search(r'</a>.*?<br>(.*?)<br>', li, re.DOTALL)
    if authors_m:
        authors = clean_html_tags(authors_m.group(1))
    # Publication: after authors <br>
    pub = None
    pub_m = re.search(r'<br>[^<]*<br>(.*?)(?:<br>|$)', li, re.DOTALL)
    if pub_m:
        pub = clean_html_tags(pub_m.group(1))
    else:
        # fallback: after authors <br>
        pub_m = re.search(r'<br>([^<]*\([A-Z]+.*)', li)
        if pub_m:
            pub = clean_html_tags(pub_m.group(1))
    # Compose
    entry = {}
    if idx: entry["index"] = idx
    if title: entry["title"] = title
    if authors: entry["authors"] = authors
    if pub: entry["publication"] = pub
    if link: entry["link"] = link
    return entry

def parse_conference_li(li):
    idx = None
    idx_m = re.match(r'\(?(\d+)\)?', li)
    if idx_m:
        idx = int(idx_m.group(1))
    # Title and link
    title = None
    link = None
    title_m = re.search(r'<a[^>]*href="([^"]*)">["“]?(.*?)["”]?</a>', li)
    if title_m:
        link = title_m.group(1).strip()
        title = title_m.group(2).strip()
    else:
        # fallback: try to get title in quotes
        title_m = re.search(r'["“](.*?)["”]', li)
        if title_m:
            title = title_m.group(1).strip()
        else:
            # fallback: up to first <br> or comma
            title_m = re.match(r'\(?\d+\)?\s*["“]?(.*?)(?:(?:["”]?,)|<br>|,)', li)
            if title_m:
                title = title_m.group(1).strip()
    # Authors: after title, before next <br>
    authors = None
    authors_m = re.search(r'(?:</a>|["”],?)<br>(.*?)<br>', li, re.DOTALL)
    if authors_m:
        authors = clean_html_tags(authors_m.group(1))
    # Publication: after authors <br>
    pub = None
    pub_m = re.search(r'<br>(.*?)(?:<br>|$)', li, re.DOTALL)
    if pub_m:
        pub = clean_html_tags(pub_m.group(1))
    else:
        # fallback: after authors <br>
        pub_m = re.search(r'<br>([^<]*\d{4}.*)', li)
        if pub_m:
            pub = clean_html_tags(pub_m.group(1))
    entry = {}
    if idx: entry["index"] = idx
    if title: entry["title"] = title
    if authors: entry["authors"] = authors
    if pub: entry["publication"] = pub
    if link: entry["link"] = link
    return entry

def parse_technical_li(li):
    idx = None
    idx_m = re.match(r'\(?(\d+)\)?', li)
    if idx_m:
        idx = int(idx_m.group(1))
    # Title and link
    title = None
    link = None
    title_m = re.search(r'<a[^>]*href="([^"]*)">["“]?(.*?)["”]?</a>', li)
    if title_m:
        link = title_m.group(1).strip()
        title = title_m.group(2).strip()
    else:
        # fallback: try to get title in quotes
        title_m = re.search(r'["“](.*?)["”]', li)
        if title_m:
            title = title_m.group(1).strip()
        else:
            # fallback: up to first <br> or comma
            title_m = re.match(r'\(?\d+\)?\s*["“]?(.*?)(?:(?:["”]?,)|<br>|,)', li)
            if title_m:
                title = title_m.group(1).strip()
    # Authors: after title, before next <br>
    authors = None
    authors_m = re.findall(r'<br>(.*?)<br>', li, re.DOTALL)
    if authors_m:
        # Take the first non-empty as authors
        for a in authors_m:
            a_clean = clean_html_tags(a)
            if a_clean:
                authors = a_clean
                break
    # Publication: after authors <br>
    pub = None
    pub_m = re.findall(r'<br>(.*?)<br>', li, re.DOTALL)
    if pub_m and len(pub_m) > 1:
        pub = clean_html_tags(pub_m[1])
    else:
        # fallback: after authors <br>
        pub_m = re.search(r'<br>([^<]*\d{4}.*)', li)
        if pub_m:
            pub = clean_html_tags(pub_m.group(1))
    entry = {}
    if idx: entry["index"] = idx
    if title: entry["title"] = title
    if authors: entry["authors"] = authors
    if pub: entry["publication"] = pub
    if link: entry["link"] = link
    return entry

def main():
    with open("src/misc/info.xml", encoding="utf-8") as f:
        text = f.read()

    # Extract sections
    journal_section = extract_section(text, r'pub\.png')
    conference_section = extract_section(text, r'cp\.png')
    technical_section = extract_section(text, r'tp\.png')

    # Parse items
    journals = [parse_journal_li(li) for li in parse_li_items(journal_section)]
    conferences = [parse_conference_li(li) for li in parse_li_items(conference_section)]
    technicals = [parse_technical_li(li) for li in parse_li_items(technical_section)]

    # Remove empty entries
    journals = [j for j in journals if j.get("title")]
    conferences = [c for c in conferences if c.get("title")]
    technicals = [t for t in technicals if t.get("title")]

    # Compose output
    data = {
        "Journal": journals,
        "Conference": conferences,
        "Technical": technicals
    }

    with open("src/data/publications.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()