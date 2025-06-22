export default function FooterLayout() {
    return (
      <footer className="fixed bottom-0 w-full bg-white shadow-inner z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Go-Horse. Todos os direitos reservados.
        </div>
      </footer>
    );
  }
  