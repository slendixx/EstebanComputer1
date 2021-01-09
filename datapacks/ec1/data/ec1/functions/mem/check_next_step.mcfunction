#instruction cycle
execute if score ic inststep matches 1 run function ec1:ic/step2
#ld1
execute if score ld1 inststep matches 1 run function ec1:is/dt/ld1/last
#ld2
execute if score ld2 inststep matches 1 run function ec1:is/dt/ld2/last
#ldi1
execute if score ldi1 inststep matches 1 run function ec1:is/dt/ldi1/step2
execute if score ldi1 inststep matches 2 run function ec1:is/dt/ldi1/last
#ldi2
execute if score ldi2 inststep matches 1 run function ec1:is/dt/ldi2/step2
execute if score ldi2 inststep matches 2 run function ec1:is/dt/ldi2/last
#sti
execute if score sti inststep matches 1 run function ec1:is/dt/sti/step2