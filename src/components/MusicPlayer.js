export const MusicPlayer = ({ isUpdating }) => {
  return (
    <nav className="MusicPlayer border-top text-light shadow-lg bg-dark navbar fixed-bottom navbar-light bg-light">
      <audio controls>
        <source src="" type="audio/mpeg" />
      </audio>
    </nav>
  );
};
