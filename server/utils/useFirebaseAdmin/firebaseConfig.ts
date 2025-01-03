import admin, { ServiceAccount } from "firebase-admin";

const serviceAccount = {
    "type": "service_account",
    "project_id": "akbar-smarthome",
    "private_key_id": "5f5d3d634ff8b71af47b2de8815e7ba0f92f5d9f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnz+NHsN5LBCtC\nkZnQTe31zcNzVfpO+g1XOmgY9xYjTYYrOqZRrNLwexvHMzTZZvAVKqo4jb2VC3ju\n2rWQk1Faq0ThQx8LqSyX/91oYsnXrCtnU2F1KQksRru1uRXdsyBcy2lKP5ifAvKU\nr3SyqzNRvhT7ZzWe9J3LlzPXr+Nkn/5e98ufN9jYrdgYQ6XT/mkGeABMLuLBGsQm\nZ6Bxw5dC9BF5g02MWzwo91g92Lp6m9aaE+WC4fBKuq/cGlbWdX29tfdA7TBCMhZS\n0y1WNpWbBB4Lpjtnt0BndZIHwGcs4aYyXmDTGH3dksKRZJ3J1mQgy62b+9+3kAcB\n60GeGS2DAgMBAAECggEAEkQNE6kbUSQHh2vsx6Er5ST8AMpbgAw0tolrekgu1zHh\niEQOhXZf0YA88k5PEtjjChLGS3iWKaqBg9I3kCCQ6uMYkMJrFyxXZ8YYdfvGx5x8\nbvdC9Os+Dd03Il0ela6hN6iGcegBN1GtUOTWOXpsEBo2E3VU/1PV9yqioHgLMtEQ\nTS9Iwsz7UYjQQafYBCXEHjCSodM6ayLtvJalWOK7OjrQbTRMTqNKyWZowtpBzztF\nmR1RxOUQvV1YxeKqjoTZyOzG0DB3rKS/QeuCIREZ8j4HolgPbqtrfifDamJG623h\nA93+Vgs6N7sX+ffeVvnKqVQazsXkLM8Z+CYiiPbopQKBgQDVmgcl+mdOtyPJL08f\nkchUPsgWeWVcI6wLWIOmWjSTGskAh/U0FpYgBaXCgLljA0C8b1U18OQEhKRvIOAk\nwLqegT5C+0O0j077C8ZzbNufGos4YCW3A7e0sg0lvLwrmN1808WUek0vxaYUiT0y\nZEqx3f1AqCZm0hTPz0AiICstZQKBgQDJHxpitiOq5TDHY2XnPlx4gvmBjq29lK56\nzw+iwoWFIt+XFqwQj/bDJjNYJbJPpK2haUfsA6boeYTVcFVUC5hfqnoeNjh2QgZ6\nDJSJ8iOtsVVR0el+o/RFeZxnHrmc3Egv+1nc8Xkh4dTlsL0hC1temqFYvApV724W\nw9h6Q7kUxwKBgQCltPp6sgnW/Sjb+MGvQg9hm9rp5H+HvXzIyIBJW42R2aO5r7/A\nCw2oBfmULPylHW7pQI2gbSLXhndyZtS8bm/Ya3d7yyW5O7wP8hCglwDCK3t53s0j\nb9Tib4bXkdWBFPQu1LNg/ohG2VSAdf9tynRQDGFd+ZThC3VtyeB9GOumKQKBgBp6\nUcr1F7UD/2wAlgXfm+TxuU9pLU5sKJxabkCLQ3DHqpAFmBmGGoKOoOvV6qe5knJR\nnfpgcLTiaq5+33z1GdZeZz1a/gvznU6sIVIX4sKXOhhPfmIBy8Lpw8F/tggEqCxI\n9wezcrMXPCQRJJUZHapSyTMZbnLp1qCAoBtYlyE5AoGAc0YG/x1cu+m4MFPh4+ii\novZ6SNkcJVhCqUvO1GdkSSHNiAjSG+/gxaW/hXuAY7zO/w+/9ZXuAr5zuVv5xx7m\nGYUlCshUGuygzS0mrUvBzgW2J33oyUogGsNuY2I2fkI8em4dKkIOd9Usb+Id3x/8\nrk4WRFiP8NcSMZWk+qD3qPo=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-r1imb@akbar-smarthome.iam.gserviceaccount.com",
    "client_id": "101299771939675630848",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r1imb%40akbar-smarthome.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

export const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});
