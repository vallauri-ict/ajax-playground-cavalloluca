# **`CAVALLO LUCA`:horse:**
### Ajax - Finance 
Lo scopo di questo esercizio è quello di interrogare in modalità Ajax una API pubblica di nome “Alpha Vantage”, che dispone di moltissime chiamate per ricevere dati relativi a transazioni borsistiche.

Json-Server è un tool NodeJS che permette di simulare l'esistenza di un set di API in modalità REST-JSON, basato su un semplice file di configurazione contenente dati pre-formattati che consentano il testing delle applicazioni. Il prerequisito per il suo utilizzo è l'installazione di NodeJS, che vi consiglio in versione LTS (Long-Term Support).

ChartJS è una libreria JavaScript responsive, open-source e molto flessibile, che permette di creare semplicemente grafici efficaci, alimentando il motore di rendering con dati e opzioni in formato JSON.

Per evitare problemi di CORS e simulare correttamente la pubblicazione reale del nostro sito, viene utilizzato il modulo NodeJS "http-server", che consente di attivare con estrema semplicità un server http in localhost ed è più snello ed immediato rispetto a XAMPP.

C'è la possibilità di visionare grafici relativi ai rank giornalieri e di eseguirne il download.
Il bottone per salvarsi il download del grafico su drive non è funzionante.

Funzione per il download del grafico:
>_btnDownload.prop("href", myChart.toBase64Image());

I dati relativi ai vari rank giornalieri vengono presi da un file json e ottenuti simulando un'API tramite json-server.
>$.getJSON("http://localhost:3000/chart", function (dataChart) {
        $.getJSON("http://localhost:3000/sectors", function (dataSectors) { ...
        



**4B INF IIS G.VALLAURI**
