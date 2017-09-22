# DATABASE
db_username = 'root'
db_password = 'toor'
db_name = 'fscaffold'
db_hostname = 'localhost'

DEBUG = True
PORT = 5000
HOST = "0.0.0.0"
SQLALCHEMY_ECHO = False
SECRET_KEY = "SOME SECRET"

# PostgreSQL
# SQLALCHEMY_DATABASE_URI = "postgresql://{DB_USER}:{DB_PASS}@{DB_ADDR}/{DB_NAME}".format(
#     DB_USER=db_username,
#     DB_PASS=db_password,
#     DB_ADDR=db_hostname,
#     DB_NAME=db_name)

# MySQL
SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_ADDR}/{DB_NAME}".format(
    DB_USER=db_username,
    DB_PASS=db_password,
    DB_ADDR=db_hostname,
    DB_NAME=db_name)

# Email Server Configuration

MAIL_DEFAULT_SENDER = "leo@localhost"

PASSWORD_RESET_EMAIL ="""
    Hi,

      Please click on the link below to reset your password

      <a href="/forgotpassword/{token}> Click here </a>"""
