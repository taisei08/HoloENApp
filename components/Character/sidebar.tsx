import Link from 'next/link';
import { characters } from '../../data/character';

const Sidebar = () => {
  return (
    <div className="overflow-x-auto w-80">
      <table className="table">
        <tbody>
          {characters.map((character) => (
            <tr key={character.enName}>
              <td className='p-0'>
                <Link href={`${character.src}`} className="flex items-center p-2 hover:bg-secondary/20 transition duration-300">
                  <span className="inline-block w-3 h-3 bg-secondary mr-2 rounded"></span>
                  {character.enName}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sidebar;
