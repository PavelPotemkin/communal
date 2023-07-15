import * as React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Context, IContext } from './App';

interface Props {
    type: 'water' | 'gas' | 'electricity';
    onChange: (values: IContext) => void;
}

const nameTypeMap = {
    water: 'вода',
    gas: 'газ',
    electricity: 'электричество',
}

export default function Section({ type, onChange }: Props) {
    const context = React.useContext(Context);
    const name = nameTypeMap[type];
    const lookAtMishaPart = type !== 'electricity';

    const [mishaValue, setMishaValue] = React.useState(0);
    const [pashaValue, setPashaValue] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [sum, setSum] = React.useState(0);
    const sumPasha = (pashaValue / value) * sum;
    const sumMisha = (mishaValue / value) * sum;

    React.useEffect(() => {
        if (lookAtMishaPart) {
            setPashaValue(value - mishaValue);
        } else {
            setMishaValue(value - pashaValue);
        }
    }, [value, mishaValue, pashaValue, lookAtMishaPart]);

    React.useEffect(() => {
        onChange({
            ...context,
            misha: {
                ...context.misha,
                [type]: sumMisha,
            },
            pasha: {
                ...context.pasha,
                [type]: sumPasha,
            },
        });
    }, [sumMisha, sumPasha, type, context, onChange]);

    return (
        <Card className="flex flex-col gap-4 p-4">
            <h2 className='text-xl uppercase'>
                {name}
            </h2>

            <div className='flex flex-col gap-2'>
                <p className='text-sm'>
                    Общий показатель за месяц = {value}
                </p>

                <p className='text-sm'>
                    Показания Миши = {mishaValue}
                </p>

                <p className='text-sm'>
                    Показания Паши = {pashaValue}
                </p>

                <p className='text-sm'>
                    Сумма Миши = {sumPasha || '-'}
                </p>

                <p className='text-sm'>
                    Сумма Паши = {sumMisha || '-'}
                </p>
            </div>
        
            <div className='grid md:grid-cols-2 flex-col gap-2'>
                <TextField
                    label="Общий показатель"
                    type="number" 
                    value={value} 
                    onInput={(e) => setValue(+(e.target as HTMLInputElement).value)}
                />
                
                {
                    lookAtMishaPart ? (
                        <TextField 
                            label="Показания Миши"
                            type="number" 
                            value={mishaValue} 
                            onInput={(e) => setMishaValue(+(e.target as HTMLInputElement).value)}
                        />
                    ) : (
                        <TextField 
                            label="Показания Паши"
                            type="number" 
                            value={pashaValue} 
                            onInput={(e) => setPashaValue(+(e.target as HTMLInputElement).value)}
                        />
                    )
                }

                <TextField
                    label="Общая сумма, др"
                    type="number" 
                    value={sum} 
                    onInput={(e) => setSum(+(e.target as HTMLInputElement).value)}
                />
            </div>
        </Card>
    )
}