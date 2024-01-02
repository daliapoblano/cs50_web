#Decorators are functions that take in functions and modifies it by adding some other capabilities to it 
# and then gives us back some output 
def announce(f):
    def wrapper():
        print("About to run the function...")
        f()
        print("Done with the function.")
    return wrapper

#First: Define function called Hello 
#Second: Add a decorator
@announce
def hello():
    print("Hello, world!")

#call the function hello
hello()

#will print out:
#About to run the function...
#Hello, world!
#Done with the function