import { api } from "./lib/api";
import { useQuery } from "@tanstack/react-query";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

async function getTotalSpent() {
	const res = await api.expenses["total-spent"].$get();
	if (!res.ok) {
		throw new Error("server error");
	}
	const data = await res.json();
	return data;
}

function App() {
	const { isPending, error, data } = useQuery({
		queryKey: ["get-total-spent"],
		queryFn: getTotalSpent,
	});

	if (isPending) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<>
			<Card className="w-[350px] m-auto">
				<CardHeader>
					<CardTitle>Total Spent</CardTitle>
					<CardDescription>Total amount you've spent</CardDescription>
				</CardHeader>
				<CardContent>{isPending ? "..." : data.totalSpent}</CardContent>
			</Card>
		</>
	);
}

export default App;
