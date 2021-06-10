class Relogio {
    constructor(id,interval,horaFormato,horaAtual){
        this.id = id
        this.interval = interval
        this.horaFormato = horaFormato  // Hora, Minutos ou Segundos
        this.count = horaAtual
    }

    start(){
        const path = document.querySelector(`#relogio-${this.id}`)
        const txt = document.querySelector(`#relogio-txt-${this.id}`)

        path.setAttribute('stroke-dasharray',`${this.count*(283/this.horaFormato)} 283`)
        txt.textContent = (this.count.toString()).padStart(2,'0')
        
        setInterval(()=>{
            
            path.setAttribute('stroke-dasharray',`${this.count*(283/this.horaFormato)} 283`)
            txt.textContent = (this.count.toString()).padStart(2,'0')
            
            this.count--

            if(this.count<0) this.count = this.horaFormato-1
        },this.interval)

    }
}

const Contador = {
    start(){
        
        if(!localStorage.time) {
            let date = new Date()
            let Horas = date.getHours()
            let Minutos = date.getMinutes()
            let Segundos = date.getSeconds()

            localStorage.setItem('time',JSON.stringify({Horas,Minutos,Segundos}))
        }
            
        const { Horas, Minutos, Segundos } = JSON.parse(localStorage.getItem('time'))

        console.log(`${Horas}:${Minutos}:${Segundos}`)

        const Hora = new Relogio('horas', 3600000, 24 ,Horas)
        const Minuto = new Relogio('minutos', 60000, 60 ,Minutos)
        const Segundo = new Relogio('segundos', 1000, 60 ,60)

        Hora.start()
        Minuto.start()
        Segundo.start()

        window.onbeforeunload = ()=>{
           let horaSalva = {
               Horas: Hora.count,
               Minutos: Minuto.count,
               Segundos: Segundo.count
           }
           localStorage.setItem('time',JSON.stringify(horaSalva))
       } 
    }
}

export default Contador


