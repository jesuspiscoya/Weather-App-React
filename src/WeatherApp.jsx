import React, { useState } from 'react'

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '975931596d136c1b4f594b919db9845d'
    const difKelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const responde = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}&lang=es`)
            const data = await responde.json()
            console.log(data);
            setDataClima(data)
        } catch (error) {
            console.log('Ocurrior el siguiente problema:', error)
        }
    }

    return (
        <div className='container'>
            <h1>App del Clima</h1>

            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Ingrese la ciudad' value={ciudad} onChange={handleCambioCiudad} />
                <button>Buscar</button>
            </form>

            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima.main.temp - difKelvin)}°</p>
                        <p>Humedad: {parseInt(dataClima.main.humidity)}%</p>
                        <p>Condición: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                    </div>
                )
            }
        </div>
    )
}