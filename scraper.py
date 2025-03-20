import os

def listar_ficheiros(pasta: str, ficheiro_saida: str):
    try:
        if not os.path.isdir(pasta):
            print(f"Erro: A pasta '{pasta}' não existe.")
            return
        
        ficheiros = os.listdir(pasta)

        # Guardar nomes e extensões no ficheiro de saída
        with open(ficheiro_saida, 'w', encoding='utf-8') as f:
            for ficheiro in ficheiros:
                if os.path.isfile(os.path.join(pasta, ficheiro)):
                    f.write(f"{ficheiro}\n")

        print(f"Lista de ficheiros guardada em: {ficheiro_saida}")

    except Exception as e:
        print(f"Erro: {e}")

# Definir os caminhos diretamente no código
pasta = "C:/Users/jccab/Desktop/ESTCB/site_feiraEmprego_IPCB/images/empresas"  
ficheiro_saida = "C:/Users/jccab/Desktop/ESTCB/site_feiraEmprego_IPCB/lista2.txt"  


listar_ficheiros(pasta, ficheiro_saida)
