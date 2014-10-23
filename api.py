"""API for JS Webapp Wall application.
In real life, for us to share messages between different users of this
application, we'd want to store the messages in a server-side persistent
store (like a relational database). However, since we're demonstrating how
to use client-side session systems, this stores things there.
"""
from flask import session
# So that you can play with the `get` API, we return a single
# test message as the default.

DEFAULT_MESSAGES = [ {'message': 'Welcome! (this is the built-in first message)'},]
print type (DEFAULT_MESSAGES) #this is a list

def wall_error(error):
    """Handle API errors. error: (string) error message
      returns: dictionary error object.   """

    return {  "result": error,    }

def wall_list():
    """Get messages.returns: dictionary with messages list + result code. """
    return {
        "result": "OK",
        "messages": session.setdefault('wall', DEFAULT_MESSAGES),    }

def wall_add(msg): # recieving post from .js function add messages, msg = string
    """Set a new message.  msg: (string) message
        returns: dictionary with messages list + result code. """
    wall_dict = {"message": msg,} #create new dict, add one key value pair
    #print wall_dict
    session.setdefault('wall', []).append(wall_dict) #looking for the default wall which is in session, we can't see it 
    result = wall_list() #result = (function above that returns dictionary with 2 key:value pairs)
    result["result"] = "Message Received" # the value of key result (OK) with "Message Recieved" 
    #print result
    return result #return dictionary {"result : "Message Received", "messages": "...."}, 
    #this result goes back to wall.js,

def wall_clear():
    session['wall'] = DEFAULT_MESSAGES
    result = wall_list()
    result["result"] = "Message Cleared"
    return result