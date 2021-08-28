-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 27. 08 2021 um 23:08
-- Server-Version: 10.4.19-MariaDB
-- PHP-Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `vier`
--
CREATE DATABASE IF NOT EXISTS `vier` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE `vier`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `games`
--

CREATE TABLE `games` (
  `gameID` int(11)  ,
  `playerONE` int(11)  ,
  `playerTWO` int(11) DEFAULT 0 ,
  `reihenfolge` int(11)  ,
  `spielZustand` varchar(100) COLLATE utf8mb4_bin  ,
  `colorp1` varchar(10) COLLATE utf8mb4_bin  ,
  `colorp2` varchar(10) DEFAULT 0  COLLATE utf8mb4_bin  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Daten für Tabelle `games`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11)  ,
  `username` varchar(25)  ,
  `name` varchar(50)  ,
  `mail` varchar(50)  ,
  `password` text  ,
  `picture` tinyint(1)   DEFAULT 0,
  `active` tinyint(1) DEFAULT 0,
  `challenge` varchar(100)  ,
  `confirmed` tinyint(1)   DEFAULT 0,
  `age` int(11)  ,
  `color` varchar(7)  ,
  `gameID` int(11),  
  `gender` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `mail`, `password`, `picture`, `active`, `challenge`, `confirmed`, `age`, `color`, `gameID`) VALUES
(30, 'thomas', 'thomas', 'fferfer@rgegreg.com', '$2y$10$XYmQKhhKFjhupGsYYbtAZeHk2KYjW4aZVjPnAOWkSKpNOuzR1XjuW', 0, 1, '200d5d9383ea0ea7ca9533d7d91f0276', 1, 0, '#c800ff', 128),
(31, 'florian', 'florian', 'flo@eins.de', '$2y$10$gpFswIf2Pwb0f3JXMjnvxu8ADmhkVmLDf1Wk3Z8Absykma3/mglBi', 0, 1, 'd96ee7900ec84160a41c68de0833cfd1', 1, 0, '#4089bf', 128),
(45, 'anna', 'anna', 'anna@jkdiw.de', '$2y$10$wRTqpRxs1Mv7vPBfh1UDPOfysAHwM3MCylfmRiFIYEPgi0IIBrOEG', 0, 1, '04b6bed821f063ec7b8acb5762f3173f', 1, 0, '#ff0000', 143);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`gameID`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `gameID` int(11)   AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11)   AUTO_INCREMENT, AUTO_INCREMENT=45;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
