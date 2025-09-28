import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IssuedBooks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issued Books</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Show list of issued books here */}
      </CardContent>
    </Card>
  );
};

export default IssuedBooks;
