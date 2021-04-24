#increase call stack pointer
scoreboard players add csptr reg 1

scoreboard players operation pcinc reg = ir2 reg

function ec1:ic/step3