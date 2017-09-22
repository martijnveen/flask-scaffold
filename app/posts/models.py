import datetime
from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.basemodels import db, CRUD_MixIn


class Posts(db.Model, CRUD_MixIn):
    id = db.Column(db.Integer, primary_key=True)

    tittle = db.Column(db.String(250), nullable=False)
    body = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(250), nullable=False)
    creation_date = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    published = db.Column(db.Integer, nullable=False)

    def __init__(self,  tittle,  body,  author,  creation_date,  published, ):

        self.tittle = tittle
        self.body = body
        self.author = author
        self.creation_date = creation_date
        self.published = published


class PostsSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    # add validate=not_blank in required fields
    id = fields.Integer(dump_only=True)

    tittle = fields.String(validate=not_blank)
    body = fields.String(validate=not_blank)
    author = fields.String(validate=not_blank)
    creation_date = fields.DateTime(required=True)
    published = fields.Integer(required=True)

    # self links
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/posts/"
        else:
            self_link = "/posts/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'posts'
