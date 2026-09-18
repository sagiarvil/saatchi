import re
import sys

def is_watch(text: str) -> bool:
    if not text:
        return True
    text = text.lower()
    blacklist = [
        "kalem", "kolye", "bileklik", "cüzdan", "gözlük", "parfüm", "çanta", 
        "küpe", "yüzük", "mücevher", "anahtarlık", "kol düğmesi", "kravat", 
        "kemer", "şapka", "atkı", "şal", "bere", "eldiven", "cufflinks", 
        "pen ", " pen", "necklace", "bracelet", "wallet", "sunglass", "perfume", 
        "bag", "earring", "ring", "jewelry", "keychain", "tie", "belt", "hat", 
        "scarf", "beanie", "glove"
    ]
    for w in blacklist:
        if w in text:
            return False
    return True
