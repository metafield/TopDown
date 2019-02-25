import { observable } from 'mobx';

class Store {
    
    @observable
    public deemoSpeed = {
        breakdownX: '',
        breakdownY: '',
        x: 0,
        y: 0
    }
    
}

export default Store