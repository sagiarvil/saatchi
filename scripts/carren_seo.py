import random
import hashlib

def generate_carren_description(item_id: str, model_name: str, gender: str, ref: str) -> str:
    seed = int(hashlib.md5(item_id.encode('utf-8')).hexdigest(), 16)
    rng = random.Random(seed)
    
    is_women = "kad" in (gender or "").lower()
    
    # Şablon 1: Giriş / Kanca (Hook)
    hooks_men = [
        f"Zamanın ötesinde bir şıklık arayan erkekler için tasarlanan {model_name}, Carren'in üstün işçiliğini bileğinize taşıyor.",
        f"Modern erkeğin dinamik yaşam tarzına mükemmel uyum sağlayan Carren {model_name} serisi ile tarzınızı tamamlayın.",
        f"Güçlü bir duruş ve estetik tasarımın mükemmel birleşimi: Carren {model_name} erkek kol saati.",
        f"Hem iş hayatında hem de günlük kullanımda fark yaratmak isteyenlerin tercihi olan {model_name}, lüks hissiyatı erişilebilir kılıyor."
    ]
    hooks_women = [
        f"Zarafeti ve şıklığı bir arada sunan Carren {model_name} kadın kol saati, bileğinizde göz alıcı bir ışıltı yaratıyor.",
        f"Modern kadının sofistike tarzını yansıtan {model_name} serisi, günün her anında size eşlik edecek zarif bir aksesuar.",
        f"İnce detayları ve estetik çizgileriyle dikkat çeken Carren {model_name}, stilinize lüks bir dokunuş katıyor.",
        f"Hem klasik hem de modern stillerle kusursuz bir uyum yakalayan {model_name} kadın kol saati ile zamanı şıklıkla takip edin."
    ]
    
    # Şablon 2: Tasarım ve Detaylar
    design_details = [
        "Minimalist kadran tasarımı ve özenle işlenmiş detayları, saatin estetik değerini zirveye taşıyor.",
        "Sağlam kasa yapısı ve yüksek kaliteli kordonu sayesinde uzun yıllar boyunca ilk günkü parlaklığını korur.",
        "Dikkat çekici kordon tasarımı ve ergonomik yapısı, gün boyu maksimum konfor sunar.",
        "Özenle seçilmiş renk paleti ve parlamaya karşı dayanıklı camı ile her açıdan kusursuz bir görünüm sergiler.",
        "Klasik saatçilik anlayışını modern dokunuşlarla harmanlayan bu model, bilekte son derece zarif durur."
    ]
    
    # Şablon 3: Prestij ve Kapanış
    closures = [
        "Kendinize veya sevdiklerinize unutulmaz bir armağan vermek istiyorsanız, bu özel Carren tasarımı mükemmel bir seçim olacaktır.",
        f"Saatchi güvencesiyle sunulan {ref} referans numaralı bu özel parça, lüks saat koleksiyonunuzun vazgeçilmezi olmaya aday.",
        "Stil sahibi bir duruş sergilemek ve zamanı yakalamak için Carren kalitesini tercih edin.",
        f"{model_name} modeli, özel günlerde tarzınızı taçlandıracak ve bakışları üzerinize çekecek."
    ]
    
    h = rng.choice(hooks_women if is_women else hooks_men)
    d = rng.choice(design_details)
    c = rng.choice(closures)
    
    return f"{h} {d} {c}"

def enrich_carren_catalog(watches: list) -> list:
    for w in watches:
        if str(w.get("brand") or "").lower() == "carren":
            item_id = str(w.get("id") or "")
            model_name = str(w.get("modelName") or "Carren Saat")
            gender = str(w.get("gender") or "Erkek")
            ref = str(w.get("ref") or "")
            w["description"] = generate_carren_description(item_id, model_name, gender, ref)
    return watches
