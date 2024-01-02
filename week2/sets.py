#Create an empty set
s = set()

#Add elements to the set 
# No elemet appears more than once in a set
s.add(1)
s.add(2)
s.add(3)
s.add(4)
s.add(3) 
print(s)

# Removing an element from a set
s.remove(2)

# len of a set and formatted strings 
print(f"The set has {len(s)} elements")

