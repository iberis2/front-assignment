import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page.</p>
      <Link href='/todo-list'>Click me</Link>
    </div>
  );
}
