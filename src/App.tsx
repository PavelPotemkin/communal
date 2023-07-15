import * as React from 'react';
import Section from './Section'
import { Card } from '@mui/material';

interface Values {
  water: number;
  gas: number;
  electricity: number;
}

interface Context {
  misha: Values;
  pasha: Values;
}

const defaultValue: Context = {
  misha: {
    water: 0,
    gas: 0,
    electricity: 0,
  },
  pasha: {
    water: 0,
    gas: 0,
    electricity: 0,
  }
};

export const Context = React.createContext<Context>({...defaultValue});

export default function MyApp() {
  const [values, changeValues] = React.useState<Context>({...defaultValue});

  const result = React.useMemo(() => {
    const misha = Object.values(values.misha).reduce((acc, value) => acc + (+value || 0), 0);
    const pasha = Object.values(values.pasha).reduce((acc, value) => acc + (+value || 0), 0);

    return {
      misha,
      pasha,
    };
  }, [values]);

  return (
    <div className="p-4 md:p-10 flex flex-col gap-4">
      <h1 className="text-2xl">
        Расчёт коммунальных платежей
      </h1>

      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
        <Context.Provider value={values}>
          <Section type='water' onChange={changeValues} />
          <Section type='gas' onChange={changeValues} />
          <Section type='electricity' onChange={changeValues} />
          <Card className="flex flex-col gap-4 p-4">
            <h2 className='text-xl uppercase'>
                Сумма
            </h2>

            <div className='flex flex-col gap-2'>
              <p className='flex flex-col'>
                <span>
                  Паша: {result.pasha || '-'}
                </span>

                <span>
                  Паша c интернетом: {+result.pasha + 6250 || '-'}
                </span>
              </p>

              <p className='flex flex-col'>
                <span>
                  Миша: {result.misha || '-'}
                </span>

                <span>
                  Миша c интернетом: {+result.misha + 6250 || '-'}
                </span>
              </p>

              <p className='flex flex-col'>
                <span>
                  Всего: {+result.pasha + +result.misha || '-'}
                </span>

                <span>
                  Всего c интернетом: {+result.pasha + +result.misha + 12500 || '-'}
                </span>
              </p>
            </div>
          </Card>
        </Context.Provider>
      </div>
    </div>
  );
}