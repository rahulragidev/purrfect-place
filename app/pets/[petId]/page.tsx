export default function Page({ params }: { params: { petId: string } }) {
  return <div>My Pet: {params.petId}</div>;
}
