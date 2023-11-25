import {surpriseMePrompts} from '../constants/constants'
export const getRandom=(prompt)=>{
    const index = Math.floor(Math.random()*surpriseMePrompts.length)
    const generate = surpriseMePrompts[index]
    if(prompt==generate) return getRandom(prompt)
    return generate
}