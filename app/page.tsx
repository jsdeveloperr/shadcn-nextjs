import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "./loading";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return result.json();
}

export default async function Home() {
  const recipes = await getRecipes();
  return (
    <main>
      {recipes.length === 0 ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="flex flex-col justify-between">
              <CardHeader className="flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage src={recipe.image} alt={recipe.name} />
                  <AvatarFallback>{recipe.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{recipe.name}</CardTitle>
                  <CardDescription>
                    <p>
                      {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins to
                      cook
                    </p>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{recipe.instructions[0]}</p>
                <p>{recipe.instructions[1]}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>View Recipe</Button>
                <Badge variant="secondary">{recipe.difficulty}!</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
