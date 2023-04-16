import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const teams = [
  { id: 1, name: "Team A", wins: 3, losses: 1, points: 9 },
  { id: 2, name: "Team B", wins: 2, losses: 2, points: 6 },
  { id: 3, name: "Team C", wins: 1, losses: 3, points: 3 },
  { id: 4, name: "Team D", wins: 0, losses: 4, points: 0 },
];

const TournamentTable = () => {
  const [sortedTeams, setSortedTeams] = useState(teams.sort((a, b) => b.points - a.points));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Position</TableCell>
          <TableCell>Team</TableCell>
          <TableCell>Wins</TableCell>
          <TableCell>Losses</TableCell>
          <TableCell>Points</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedTeams.map((team, index) => (
          <TableRow key={team.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{team.name}</TableCell>
            <TableCell>{team.wins}</TableCell>
            <TableCell>{team.losses}</TableCell>
            <TableCell>{team.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TournamentTable;
