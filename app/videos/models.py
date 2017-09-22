import datetime
from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.basemodels import db, CRUD_MixIn


class Videos(db.Model, CRUD_MixIn):
    id = db.Column(db.Integer, primary_key=True)

    description = db.Column(db.String(250), nullable=False)
    creation_date = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    url = db.Column(db.Text, nullable=False)

    def __init__(self,  description,  creation_date,  url, ):

        self.description = description
        self.creation_date = creation_date
        self.url = url


class VideosSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    # add validate=not_blank in required fields
    id = fields.Integer(dump_only=True)

    description = fields.String(validate=not_blank)
    creation_date = fields.DateTime(required=True)
    url = fields.String(validate=not_blank)

    # self links
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/videos/"
        else:
            self_link = "/videos/{}".format(data['id'])
        return {'self': self_link}

    class Meta:
        type_ = 'videos'
