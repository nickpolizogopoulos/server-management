
export type Status = 
  'Online' 
| 'Offline' 
| 'Unknown';

export type Server = {
    name: string;
    children?: Server[];
}

export const serverData: Server[] = [
    {
        name: 'Server information',
        children: [
            {
                name: 'System #1'
            },
            {
                name: 'System #2'
            }
        ]
    }
];
