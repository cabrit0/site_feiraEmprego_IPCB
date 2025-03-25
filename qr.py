import qrcode
from PIL import Image
import numpy as np

def main():
    # --- Configurações ---
    caminho_imagem = "images/img1.png"
    output_caminho = "qr_final.png"
    
    # Configurações WiFi
    nome_rede = "IPCB Career Summit"
    wifi_password = "minha_password_wifi"
    
    # Dados do QR Code no formato WiFi padrão
    qr_wifi = f"WIFI:S:{nome_rede};T:WPA;P:{wifi_password};H:false;;"
    
    # Carrega a imagem base
    base_img = Image.open(caminho_imagem).convert('RGBA')
    
    # --- Geração do QR Code ---
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=15,  # Aumentado de 10 para 15
        border=4      # Aumentado de 2 para 4
    )
    qr.add_data(qr_wifi)
    qr.make(fit=True)
    
    # Cria QR code como máscara com cores sólidas
    qr_img = qr.make_image(fill_color="black", back_color="white")
    
    # Redimensiona o QR code para 1/2 da menor dimensão da imagem
    qr_size = min(base_img.size) // 2  # Voltamos para 1/2 para maior tamanho
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
    
    # Calcula a posição central
    x = (base_img.size[0] - qr_size) // 2
    y = (base_img.size[1] - qr_size) // 2
    
    # Cola o QR code diretamente (sem usar a imagem de fundo como textura)
    result_img = base_img.copy()
    result_img.paste(qr_img, (x, y))
    
    # Salva a imagem final
    result_img.save(output_caminho, 'PNG', quality=95)
    
    print(f"QR Code WiFi gerado e guardado em {output_caminho}")

if __name__ == "__main__":
    main()
