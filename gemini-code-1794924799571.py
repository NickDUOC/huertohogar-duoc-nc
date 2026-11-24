import os


def recopilar_archivos():
    directorio_raiz = os.path.dirname(os.path.abspath(__file__))
    archivo_salida = os.path.join(directorio_raiz, "codigo_recopilado.txt")
    nombre_script = os.path.basename(__file__)

    # Agregado ".md" a las extensiones válidas
    extensiones_validas = (".java", ".jsx", ".xml", ".html", ".json", ".example", ".md", ".js", ".ts", ".tsx", ".css", ".scss", ".less")
    carpetas_ignoradas = {"node_modules", ".git", "target", "build", ".idea", "dist"}
    archivos_ignorados = {nombre_script, "codigo_recopilado.txt", "package-lock.json", "yarn.lock"}
    
    contador = 0

    with open(archivo_salida, "w", encoding="utf-8") as salida:
        for carpeta_actual, subcarpetas, archivos in os.walk(directorio_raiz):
            subcarpetas[:] = [
                d for d in subcarpetas if d not in carpetas_ignoradas
            ]

            for archivo in archivos:
                if archivo in archivos_ignorados:
                    continue

                if archivo.lower().endswith(extensiones_validas):
                    ruta_completa = os.path.join(carpeta_actual, archivo)
                    ruta_relativa = os.path.relpath(
                        ruta_completa, directorio_raiz
                    )

                    try:
                        with open(
                            ruta_completa,
                            "r",
                            encoding="utf-8",
                            errors="replace",
                        ) as entrada:
                            contenido = entrada.read()

                        salida.write(f"{'=' * 80}\n")
                        salida.write(f"ARCHIVO: {ruta_relativa}\n")
                        salida.write(f"{'=' * 80}\n\n")
                        salida.write(contenido)
                        salida.write("\n\n")

                        print(f"Copiado: {archivo}")
                        contador += 1

                    except Exception as e:
                        print(f"Error al leer {ruta_relativa}: {e}")

    print("-" * 40)
    print(f"Proceso finalizado. Total de archivos copiados: {contador}")
    print(f"Guardado en: {archivo_salida}")


if __name__ == "__main__":
    recopilar_archivos()