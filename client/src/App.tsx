import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function App() {
	const [totalSpent, setTotalSpent] = useState(0);

	useEffect(() => {
		fetch("/api/expenses/total-spent")
			.then((response) => response.json())
			.then((data) => setTotalSpent(data.totalSpent));
	}, []);

	return (
		<>
			<Card className="w-[350px] m-auto">
				<CardHeader>
					<CardTitle>Total Spent</CardTitle>
					<CardDescription>Total amount you've spent</CardDescription>
				</CardHeader>
				<CardContent>{totalSpent}</CardContent>
			</Card>
		</>
	);
}

export default App;
