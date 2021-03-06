from app.models import db, Post

def seed_posts():
    post1 = Post(caption='What the dog doin', user_id=8)
    post2 = Post(caption='On my way to climb!', user_id=2)
    post3 = Post(caption='127 hours type beat', user_id=2)
    post11 = Post(caption='Casual', user_id=7)
    post4 = Post(caption='Das a cute dog', user_id=8)
    post15 = Post(caption='Burrito', user_id=10)
    post23 = Post(caption='My first group project at App Academy "Gotta Latte Do"', user_id=6)
    post24 = Post(caption='My first solo project at App Academy "DotThen"', user_id=6)
    post25 = Post(caption='Another group project at App Academy "One to Ten"', user_id=6)
    post5 = Post(caption='Cut my arm off, but made it out', user_id=2)
    post13 = Post(caption='4?', user_id=7)
    post18 = Post(caption='What the cat doin', user_id=10)
    post8 = Post(caption='', user_id=4)
    post16 = Post(caption='Lazy cat', user_id=10)
    post20 = Post(caption='POPCORN DADDY in the flesh', user_id=7)
    post9 = Post(caption='Capstone week', user_id=4)
    post6 = Post(caption='Merica', user_id=2)
    post10 = Post(caption='', user_id=6)
    post12 = Post(caption='I finally won a game', user_id=7)
    post7 = Post(caption='Dancing Tube man', user_id=8)
    post17 = Post(caption='Stole my spot', user_id=10)
    post14 = Post(caption='DANG IT BOBBY', user_id=7)
    post19 = Post(caption='', user_id=7)
    post21 = Post(caption='', user_id=1)
    post22 = Post(caption='', user_id=1)

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post11)
    db.session.add(post4)
    db.session.add(post15)
    db.session.add(post23)
    db.session.add(post24)
    db.session.add(post25)
    db.session.add(post5)
    db.session.add(post13)
    db.session.add(post18)
    db.session.add(post8)
    db.session.add(post16)
    db.session.add(post20)
    db.session.add(post9)
    db.session.add(post6)
    db.session.add(post10)
    db.session.add(post12)
    db.session.add(post7)
    db.session.add(post17)
    db.session.add(post14)
    db.session.add(post19)
    db.session.add(post21)
    db.session.add(post22)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
