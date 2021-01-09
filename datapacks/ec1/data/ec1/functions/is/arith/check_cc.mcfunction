#Update condition codes
execute store result score z cc run execute if score r reg matches 0
execute store result score p cc run execute if score r reg > 0 cc
execute store result score n cc run execute if score r reg < 0 cc

function ec1:ic/step3