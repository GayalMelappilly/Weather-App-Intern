import React from 'react'
import { ReactComponent as W01d } from '../../assets/Icons/openweathermap/01d.svg'
import { ReactComponent as W01n } from '../../assets/Icons/openweathermap/01n.svg'
import { ReactComponent as W02d } from '../../assets/Icons/openweathermap/02d.svg'
import { ReactComponent as W02n } from '../../assets/Icons/openweathermap/02n.svg'
import { ReactComponent as W03d } from '../../assets/Icons/openweathermap/03d.svg'
import { ReactComponent as W03n } from '../../assets/Icons/openweathermap/03n.svg'
import { ReactComponent as W04d } from '../../assets/Icons/openweathermap/04d.svg'
import { ReactComponent as W04n } from '../../assets/Icons/openweathermap/04n.svg'
import { ReactComponent as W09d } from '../../assets/Icons/openweathermap/09d.svg'
import { ReactComponent as W09n } from '../../assets/Icons/openweathermap/09n.svg'
import { ReactComponent as W10d } from '../../assets/Icons/openweathermap/10d.svg'
import { ReactComponent as W10n } from '../../assets/Icons/openweathermap/10n.svg'
import { ReactComponent as W11d } from '../../assets/Icons/openweathermap/11d.svg'
import { ReactComponent as W11n } from '../../assets/Icons/openweathermap/11n.svg'
import { ReactComponent as W13d } from '../../assets/Icons/openweathermap/13d.svg'
import { ReactComponent as W13n } from '../../assets/Icons/openweathermap/13n.svg'
import { ReactComponent as W50d } from '../../assets/Icons/openweathermap/50d.svg'
import { ReactComponent as W50n } from '../../assets/Icons/openweathermap/50n.svg'

import { ReactComponent as Barometer} from '../../assets/Icons/all/barometer.svg'
import { ReactComponent as Windspeed} from '../../assets/Icons/all/wind.svg'
// import { ReactComponent as } from '../../assets/Icons/all/'
// import { ReactComponent as } from '../../assets/Icons/all/'

function Icon(props) {

    switch (props.icon) {
        case '01d': return props.for ? <W01d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W01d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '01n': return props.for ? <W01n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W01n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '02d': return props.for ? <W02d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W02d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '02n': return props.for ? <W02n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W02n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '03d': return props.for ? <W03d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W03d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '03n': return props.for ? <W03n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W03n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '04d': return props.for ? <W04d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W04d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '04n': return props.for ? <W04n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W04n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '09d': return props.for ? <W09d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W09d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '09n': return props.for ? <W09n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W09n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '10d': return props.for ? <W10d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W10d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '10n': return props.for ? <W10n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W10n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '11d': return props.for ? <W11d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W11d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '11n': return props.for ? <W11n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W11n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '13d': return props.for ? <W13d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W13d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '13n': return props.for ? <W13n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W13n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '50d': return props.for ? <W50d className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W50d className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        case '50n': return props.for ? <W50n className='h-20 max-sm:h-10 max-sm:px-auto max-sm:py-auto' /> : <W50n className='h-40 pl-4 max-sm:h-20 max-sm:pb-3' />
        // case 'barometer' : return <Barometer className='h-20 pl-4' />
    }
}

export default Icon