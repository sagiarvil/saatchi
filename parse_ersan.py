import re
import json

with open('ersan.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The payload is in self.__next_f.push
matches = re.findall(r'self\.__next_f\.push\(\[1,"[0-9]+:(.*?)"\]\)', html)
for m in matches:
    # m is a JSON string of a string, need to unescape
    try:
        data = json.loads('"' + m.replace('"', '\\"') + '"') # this is messy
        if "Rolex" in data:
            print(data[:200])
    except:
        pass

# Let's just find the big JSON blob that has "activeFilters"
m = re.search(r'\[{"id":"[^"]+","name":"Rolex.*?"total":\d+\}', html)
if m:
    data_str = m.group(0)
    print("Found JSON array length:", len(data_str))
    with open('ersan_data.json', 'w') as f:
        f.write(data_str)
