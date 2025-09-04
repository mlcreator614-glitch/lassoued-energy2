#!/usr/bin/env python3
"""
Script de test pour vérifier la configuration email IONOS
"""
import asyncio
import os
from dotenv import load_dotenv
from email_service import send_contact_email

# Charger les variables d'environnement
load_dotenv()

async def test_ionos_email():
    """Test simple de l'email IONOS"""
    
    print("🔧 Test de la configuration email IONOS...")
    print(f"Email: {os.environ.get('IONOS_EMAIL', 'contact@lassoued-energie.fr')}")
    print(f"Mot de passe configuré: {'✅ Oui' if os.environ.get('IONOS_PASSWORD') else '❌ Non'}")
    
    if not os.environ.get('IONOS_PASSWORD'):
        print("\n❌ ERREUR: Mot de passe IONOS non configuré!")
        print("Ajoutez votre mot de passe dans /app/backend/.env :")
        print('IONOS_PASSWORD="votre_mot_de_passe_ionos"')
        return
    
    # Données de test
    test_data = {
        "nom": "Test",
        "prenom": "Système",
        "email": "test@example.com",
        "telephone": "+33 06 05 90 61 63",
        "entreprise": "Test IONOS",
        "service": "Test Email",
        "message": "Ceci est un test automatique du système email IONOS de Lassoued Énergie.",
        "urgence": False
    }
    
    print("\n📤 Envoi d'un email de test...")
    
    try:
        result = await send_contact_email(test_data)
        
        if result:
            print("✅ SUCCESS: Email envoyé avec succès!")
            print("Vérifiez votre boîte email contact@lassoued-energie.fr")
        else:
            print("❌ ÉCHEC: Erreur lors de l'envoi de l'email")
            
    except Exception as e:
        print(f"❌ ERREUR: {str(e)}")
        print("\n🔧 Solutions possibles:")
        print("1. Vérifiez le mot de passe IONOS")
        print("2. Vérifiez que l'email existe dans votre panel IONOS")
        print("3. Désactivez temporairement 2FA si activé")

if __name__ == "__main__":
    asyncio.run(test_ionos_email())