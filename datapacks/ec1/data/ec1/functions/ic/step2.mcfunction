scoreboard players set ic inststep 2

#decode opcode in ir1
execute if score ir1 reg = ld1 instset run function ec1:is/dt/ld1/step1
execute if score ir1 reg = ld2 instset run function ec1:is/dt/ld2/step1
execute if score ir1 reg = ldi1 instset run function ec1:is/dt/ldi1/step1
execute if score ir1 reg = ldi2 instset run function ec1:is/dt/ldi2/step1
execute if score ir1 reg = st instset run function ec1:is/dt/st/step1
execute if score ir1 reg = sti instset run function ec1:is/dt/sti/step1