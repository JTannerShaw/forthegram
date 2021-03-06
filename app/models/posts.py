from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caption = db.Column(db.String(80))

    user = db.relationship('User', back_populates='user_posts')
    comments = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan")
    likes = db.relationship('PostLikes', back_populates='post', cascade="all, delete-orphan")
    photos = db.relationship('Photos', back_populates='post', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': [like.to_dict() for like in self.likes],
            'photos': [photo.to_dict() for photo in self.photos],
            'user': self.user.post_to_dict()
        }
