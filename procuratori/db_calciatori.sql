-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 02, 2020 alle 18:52
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_calciatori`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `calciatori`
--

CREATE TABLE `calciatori` (
  `ID` int(11) NOT NULL,
  `Cognome` text NOT NULL,
  `Nome` text NOT NULL,
  `CodSquadra` text NOT NULL,
  `AnnoDiNascita` year(4) NOT NULL,
  `Valore` text NOT NULL,
  `Nazionalità` text NOT NULL,
  `Ruolo` text NOT NULL,
  `CodProcuratore` text NOT NULL,
  `CodCampionato` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `calciatori`
--

INSERT INTO `calciatori` (`ID`, `Cognome`, `Nome`, `CodSquadra`, `AnnoDiNascita`, `Valore`, `Nazionalità`, `Ruolo`, `CodProcuratore`, `CodCampionato`) VALUES
(1, 'Buffon', 'Gianluigi', 'S01', 1978, '800.000', 'Italiana', 'POR', 'P01', 'C01'),
(2, 'Chiellini', 'Giorgio', 'S01', 1984, '4.000.000', 'Italiana', 'DIF', 'P02', 'C01'),
(3, 'Pjanic', 'Miralem', 'S01', 1990, '52.000.000', 'Bosniaca', 'CEN', 'P03', 'C01'),
(4, 'Ronaldo', 'Cristiano', 'S01', 1985, '60.000.000', 'Portoghese', 'ATT', 'P02', 'C01'),
(5, 'Handanovic', 'Samir', 'S02', 1984, '4.800.000', 'Slovena', 'POR', 'P04', 'C01'),
(6, 'Skriniar', 'Milan', 'S02', 1995, '48.000.000', 'Slovacca', 'DIF', 'P03', 'C01'),
(7, 'Sensi', 'Stefano', 'S02', 1995, '24.000.000', 'Italiana', 'CEN', 'P01', 'C01'),
(8, 'Lukaku', 'Romelu', 'S02', 1993, '68.000.000', 'Belga', 'ATT', 'P04', 'C01'),
(9, 'Donnarumma', 'Gianluigi', 'S03', 1999, '49.500.000', 'Italiana', 'POR', 'P03', 'C01'),
(10, 'Romagnoli', 'Alessio', 'S03', 1995, '36.000.000', 'Italiana', 'DIF', 'P02', 'C01'),
(11, 'Biglia', 'Lucas', 'S03', 1986, '2.800.000', 'Argentina', 'CEN', 'P04', 'C01'),
(12, 'Ibrahimovic', 'Zlatan', 'S03', 1981, '2.800.000', 'Svedese', 'ATT', 'P03', 'C01'),
(13, 'Courtois', 'Thibaut', 'S04', 1992, '48.000.000', 'Belga', 'POR', 'P04', 'C02'),
(14, 'Ramos', 'Sergio', 'S04', 1986, '14.500.000', 'Spagnola', 'DIF', 'P01', 'C02'),
(15, 'Modric', 'Luka', 'S04', 1985, '12.000.000', 'Croata', 'CEN', 'P03', 'C02'),
(16, 'Karim', 'Benzema', 'S04', 1987, '32.000.000', 'Francese', 'ATT', 'P04', 'C02'),
(17, 'ter Stegen', 'Marc-Andrè', 'S05', 1992, '72.000.000', 'Tedesca', 'POR', 'P02', 'C02'),
(18, 'Piquè', 'Gerard', 'S05', 1987, '20.000.000', 'Spagnola', 'DIF', 'P04', 'C02'),
(19, 'De Jong', 'Frenkie', 'S05', 1997, '72.000.000', 'Olandese', 'CEN', 'P04', 'C02'),
(20, 'Messi', 'Lionel', 'S05', 1987, '112.000.000', 'Argentina', 'ATT', 'P03', 'C02'),
(21, 'Becker', 'Alisson', 'S06', 1992, '72.000.000', 'Brasiliana', 'POR', 'P01', 'C03'),
(22, 'van Dijk', 'Virgil', 'S06', 1991, '80.000.000', 'Olandese', 'DIF', 'P04', 'C03'),
(23, 'Milner', 'James', 'S06', 1986, '6.500.000', 'Inglese', 'CEN', 'P03', 'C03'),
(24, 'Salah', 'Mohamed', 'S06', 1992, '0', 'Egiziana', 'ATT', 'P01', 'C03'),
(25, 'Bravo', 'Claudio', 'S07', 1993, '56000000', 'Cilena', 'POR', 'P03', 'C03'),
(26, 'Mendy', 'Benjamin', 'S07', 1994, '28000000', 'Franco-Senegalese', 'DIF', 'P01', 'C03'),
(27, 'De Bruyne', 'Kevin', 'S07', 1991, '120000000', 'Belga', 'CEN', 'P03', 'C03'),
(28, 'Jesus', 'Gabriel', 'S07', 1997, '56000000', 'Brasiliana', 'ATT', 'P01', 'C03');

-- --------------------------------------------------------

--
-- Struttura della tabella `campionati`
--

CREATE TABLE `campionati` (
  `Nome` text NOT NULL,
  `Nazione` text NOT NULL,
  `CodCampionato` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `campionati`
--

INSERT INTO `campionati` (`Nome`, `Nazione`, `CodCampionato`) VALUES
('Serie A', 'Italia', 'C01'),
('Liga', 'Spagna', 'C02'),
('Premier League', 'Inghilterra', 'C03');

-- --------------------------------------------------------

--
-- Struttura della tabella `procuratori`
--

CREATE TABLE `procuratori` (
  `Nominativo` text NOT NULL,
  `CodProcuratore` text NOT NULL,
  `password` text NOT NULL,
  `immagine` text NOT NULL,
  `Nazionalità` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `procuratori`
--

INSERT INTO `procuratori` (`Nominativo`, `CodProcuratore`, `password`, `immagine`, `Nazionalità`) VALUES
('Raiola Mino', 'P01', '657cd0659a8d7ccfd0793cbb6f1459f0', 'raiola.jpg', 'Italiana'),
('Tinti Tullio', 'P02', '657cd0659a8d7ccfd0793cbb6f1459f0', 'tinti.jpg', 'Italiana'),
('Mendes Jorge', 'P03', '657cd0659a8d7ccfd0793cbb6f1459f0', 'mendes.jpg', 'Portoghese'),
('Brisson Pat', 'P04', '657cd0659a8d7ccfd0793cbb6f1459f0', 'brisson.jpg', 'Canadese'),
('Boras Scott', 'P05', '657cd0659a8d7ccfd0793cbb6f1459f0', 'boras.jpg', 'Americana');

-- --------------------------------------------------------

--
-- Struttura della tabella `squadre`
--

CREATE TABLE `squadre` (
  `CodSquadra` text NOT NULL,
  `NomeSquadra` text NOT NULL,
  `CodCampionato` text NOT NULL,
  `Città` text NOT NULL,
  `Stadio` text NOT NULL,
  `Logo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `squadre`
--

INSERT INTO `squadre` (`CodSquadra`, `NomeSquadra`, `CodCampionato`, `Città`, `Stadio`, `Logo`) VALUES
('S01', 'Juventus', 'C01', 'Torino', 'Allianz Stadium', 'img/juventus.jpg'),
('S02', 'Inter', 'C01', 'Milano', 'San Siro', 'img/inter.jpg'),
('S03', 'Milan', 'C01', 'Milano', 'San Siro', 'img/milan.jpg'),
('S04', 'Real Madrid', 'C02', 'Madrid', 'Santiago Bernabeu', 'img/real.jpg'),
('S05', 'Barcelona', 'C02', 'Barcellona', 'Camp Nou', 'img/barcellona.jpg'),
('S06', 'Liverpool', 'C03', 'Liverpool', 'Anfield', 'img/liverpool.jpg'),
('S07', 'Manchester City', 'C03', 'Manchester', 'Etihad Stadium', 'img/muncity.jpg');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `calciatori`
--
ALTER TABLE `calciatori`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `campionati`
--
ALTER TABLE `campionati`
  ADD PRIMARY KEY (`CodCampionato`(5));

--
-- Indici per le tabelle `procuratori`
--
ALTER TABLE `procuratori`
  ADD PRIMARY KEY (`CodProcuratore`(500));

--
-- Indici per le tabelle `squadre`
--
ALTER TABLE `squadre`
  ADD PRIMARY KEY (`CodSquadra`(50));

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `calciatori`
--
ALTER TABLE `calciatori`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
