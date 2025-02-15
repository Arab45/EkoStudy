import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjaService {
    private ninja = [
        {
            id: 0,
            name: "NinjaA",
            weapon: "knife"
        },
        {
            id: 1,
            name: "NinjaB",
            weapon: "gun"
        }
    ];

    getNinjas( weapon? : "knife" | "gun"){
        if(weapon){
            return this.ninja.filter((ninja) => ninja.weapon === weapon)
        }
        return this.ninja
    }

   

    getNinja(id: number){
        const ninja = this.ninja.find((ninja) => ninja.id === id);

        if(!ninja){
            throw new Error('This data can not be find')
        }

        return ninja
    }

    createNinja( createNinjaDto: CreateNinjaDto){
        const newNinja = {
            ...createNinjaDto,
            id: Date.now()
        };
        this.ninja.push(newNinja);

        return newNinja
    }

    updateNinja( id: number, updateNinjaDto: UpdateNinjaDto ){
        this.ninja = this.ninja.map((ninja) => {
            if(ninja.id === id ){
                return { ...ninja, ...updateNinjaDto }
            }
            return ninja
        } )

        return this.getNinja(id)
    }

    removeNinja(id: number){
        const toBeRemove = this.getNinja(id);

        this.ninja = this.ninja.filter((ninja) => ninja.id !== id )

        return toBeRemove;
    }
}
