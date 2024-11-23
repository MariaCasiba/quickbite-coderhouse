import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase("mundogeek.db")

export const createSessionsTable = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL, firstName TEXT, lastName TEXT, address TEXT  )'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const addColumnsToSessions = () => {
    const promise = new Promise((resolved, rejected) => {
        
        db.transaction(tx => {
            tx.executeSql("ALTER TABLE sessions ADD COLUMN firstName TEXT;", [], 
                (_, result) => {
                    console.log('Columna firstName agregada');
                    resolved(result);
                },
                (_, error) => {
                    console.log('Error al agregar columna firstName', error);
                    rejected(error);
                }
            );
        });

        
        db.transaction(tx => {
            tx.executeSql("ALTER TABLE sessions ADD COLUMN lastName TEXT;", [], 
                (_, result) => {
                    console.log('Columna lastName agregada');
                    resolved(result);
                },
                (_, error) => {
                    console.log('Error al agregar columna lastName', error);
                    rejected(error);
                }
            );
        });

        
        db.transaction(tx => {
            tx.executeSql("ALTER TABLE sessions ADD COLUMN address TEXT;", [], 
                (_, result) => {
                    console.log('Columna address agregada');
                    resolved(result);
                },
                (_, error) => {
                    console.log('Error al agregar columna address', error);
                    rejected(error);
                }
            );
        });
    });
    return promise;
};



export const insertSession = ({email, localId, token, firstName, lastName, address}) => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'INSERT INTO sessions (email, localId, token, firstName, lastName, address) VALUES (?,?,?,?,?,?)'
        db.transaction(tx=>tx.executeSql(query,[email,localId, token, firstName, lastName, address],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const fetchSession = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'SELECT * FROM sessions'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result.rows._array),(_,result)=>rejected(result)))
    })
    return promise
}

//FUNCION PELIGROSA:
export const clearSessions= () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = "DELETE FROM sessions" 
        db.transaction(tx=>{tx.executeSql(query,[],(_, result)=>resolved(result),(_,error)=>rejected(error))})
    })
    return promise
}



