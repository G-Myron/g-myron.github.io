In this version I changed approach and decided to keep the moves made, instead of the state of the cube.
So now, instead of having 6 bits showing the rotations on each axis, I have a dynamicaly changing array of moves encoded in x0,x1 for rotation of each row around the x-axis, and respectively for y and z axes. Moreover, I denote with capital X,Y,Z the rotations in oposite way.

