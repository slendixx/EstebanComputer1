#set inststep of ldi2 to 1
scoreboard players set ldi2 inststep 1
# set memdest of aux1 to 1
scoreboard players set aux1 memdest 1
# mar <- ir2
scoreboard players operation mar reg = ir2 reg
#decode mem
function ec1:mem/decode1