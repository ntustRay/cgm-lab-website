import requests
import os
import time
import traceback

def download_schedule(url, output_folder="html", output_filename=None):
    """
    Downloads a schedule file from a given URL and saves it.
    """
    if output_filename is None:
        output_filename = os.path.basename(url) # Use filename from URL if not provided

    try:
        # Ensure the output directory exists
        base_dir = os.path.dirname(os.path.abspath(__file__))
        html_dir = os.path.join(base_dir, output_folder)
        os.makedirs(html_dir, exist_ok=True)

        # Construct the full output path
        output_filepath = os.path.join(html_dir, output_filename)

        # Download the content with retry logic
        print(f"Downloading {output_filename} from {url}...")

        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
        }

        # Try multiple times in case of network issues
        max_retries = 3
        response = None
        for attempt in range(max_retries):
            try:
                response = requests.get(url, headers=headers, timeout=30)
                response.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)
                print(f"Successfully connected for {output_filename}.")
                break # Success, exit the retry loop
            except requests.exceptions.HTTPError as e:
                 # Handle specific HTTP errors like 404 Not Found
                 if response is not None and response.status_code == 404:
                     print(f"Error 404: File not found at {url}. Skipping this year.")
                     return False # Indicate failure for this specific file
                 else:
                     print(f"HTTP Error for {url}: {e}")
                     # Decide if retry is appropriate based on status code if needed
            except requests.exceptions.RequestException as e:
                print(f"Download attempt {attempt+1} for {output_filename} failed: {e}")
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt # Exponential backoff
                    print(f"Retrying in {wait_time} seconds...")
                    time.sleep(wait_time)
                else:
                    print(f"All download attempts failed for {url}.")
                    return False # Indicate failure

        # If download failed after retries or was skipped (e.g., 404)
        if response is None or response.status_code != 200:
             print(f"Could not download {output_filename}. Status code: {response.status_code if response else 'N/A'}")
             return False

        # Decode content - try multiple approaches for better reliability
        encodings_to_try = [
            response.apparent_encoding,
            'utf-8',
            'big5', # Common for traditional Chinese sites
            'iso-8859-1',
            'windows-1252',
        ]

        html_content = None
        used_encoding = None
        for encoding in encodings_to_try:
            if encoding: # Skip None or empty encoding strings
                try:
                    html_content = response.content.decode(encoding)
                    print(f"Successfully decoded {output_filename} with {encoding}")
                    used_encoding = encoding
                    break
                except (UnicodeDecodeError, LookupError): # LookupError for invalid encoding names
                    print(f"Failed to decode {output_filename} with {encoding}")

        if html_content is None:
            print(f"All decoding attempts failed for {output_filename}. Saving raw bytes or using fallback.")
            # Fallback: save with utf-8 replace, or consider saving raw bytes if decoding is impossible
            try:
                html_content = response.content.decode('utf-8', errors='replace')
                used_encoding = 'utf-8 (with replace)'
                print(f"Using fallback decoding for {output_filename}: utf-8 with replace.")
            except Exception as decode_err:
                 print(f"Could not decode {output_filename} even with fallback: {decode_err}. Skipping save.")
                 return False


        # Save the content to the target file
        print(f"Saving content to {output_filepath}...")
        try:
            # Use the detected encoding if possible, otherwise utf-8
            save_encoding = used_encoding.split(' ')[0] if used_encoding and 'replace' not in used_encoding else 'utf-8'
            with open(output_filepath, 'w', encoding=save_encoding) as file:
                file.write(html_content)
            print(f"Successfully saved {output_filepath} using {save_encoding} encoding.")
            return True # Indicate success
        except IOError as e:
            print(f"Error writing file {output_filepath}: {e}")
            print(f"Please check permissions for folder: {html_dir}")
            return False
        except LookupError: # Handle case where detected encoding is not valid for writing
             print(f"Detected encoding '{save_encoding}' not suitable for writing. Trying utf-8.")
             try:
                 with open(output_filepath, 'w', encoding='utf-8') as file:
                     file.write(html_content)
                 print(f"Successfully saved {output_filepath} using utf-8 encoding.")
                 return True
             except IOError as e:
                 print(f"Error writing file {output_filepath} with utf-8: {e}")
                 return False


    except Exception as e:
        print(f"An unexpected error occurred while processing {url}: {e}")
        traceback.print_exc()
        return False # Indicate failure

if __name__ == "__main__":
    base_url = "https://cgm.cs.ntust.edu.tw/Activity/lab/Schedule/"
    start_year = 2008
    end_year = 2025 # Inclusive
    output_directory = "downloaded_schedules" # Define the desired output folder name here

    print(f"Starting download process for years {start_year} to {end_year}...")
    print(f"Files will be saved to the '{output_directory}' folder.") # Inform user

    success_count = 0
    fail_count = 0

    for year in range(start_year, end_year + 1):
        file_name = f"Schedule{year}.htm"
        source_url = f"{base_url}{file_name}"

        # Use the variable for the output folder
        if download_schedule(source_url, output_folder=output_directory, output_filename=file_name):
            success_count += 1
        else:
            fail_count += 1
        print("-" * 20) # Separator between years
        time.sleep(1) # Add a small delay between requests to be polite to the server

    print("\nScript execution completed.")
    print(f"Successfully downloaded: {success_count} files.")
    print(f"Failed/Skipped downloads: {fail_count} files.")