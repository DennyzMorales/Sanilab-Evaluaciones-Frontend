import React, { useEffect, useState } from 'react';

interface Pregunta {
  id: number;
  texto: string;
  orden: number;
}

interface Usuario {
  id: string;
  nombre: string;
}

interface Respuesta {
  [preguntaId: number]: number; // Ej: { 1: 5, 2: 3 }
}

const Assestments: React.FC = () => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [respuestas, setRespuestas] = useState<Respuesta>({});
  const [cargando, setCargando] = useState(true);
  const [autoevaluacionId, setAutoevaluacionId] = useState<number | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
        credentials: 'include', // 👈 Necesario para enviar cookies al backend
      })
        .then(res => {
          if (!res.ok) throw new Error('No autorizado');
          return res.json();
        })
        .then(data => setUsuario(data))
        .catch(err => console.error(err));
    }, []);


  // 0. Crear autoevaluacion
   useEffect(() => {
  if (!usuario) return; // Asegúrate de tener usuario

  const crearAutoevaluacion = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/autoevaluaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empleado_id: usuario.id
        }),
        credentials: 'include' // Por si acaso también se necesita
      });

      if (!res.ok) throw new Error('No se pudo crear autoevaluación');

      const data = await res.json();
      setAutoevaluacionId(data.id);
    } catch (error) {
      console.error('Error al crear autoevaluación:', error);
    }
  };

  crearAutoevaluacion();
}, [usuario]); // 👈 se ejecuta solo cuando ya haya un usuario


  // 1. Cargar preguntas desde la API
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/preguntas`); // cambia al endpoint correcto
        if (!res.ok) throw new Error("Error al obtener preguntas");
        const data = await res.json();
        setPreguntas(data);
        setCargando(false);
      } catch (err) {
        console.error("Error al cargar preguntas:", err);
        setCargando(false);
      }
    };
    fetchPreguntas();
  }, []);

  // 2. Manejar respuestas
  const handleChange = (id: number, valor: number) => {
    setRespuestas(prev => ({ ...prev, [id]: valor }));
  };

  // 3. Enviar respuestas al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        autoevaluacion_id: autoevaluacionId,
        respuestas: Object.entries(respuestas).map(([pregunta_id, respuesta]) => ({
          pregunta_id: Number(pregunta_id),
          respuesta
        }))
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/respuestas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('¡Gracias por tu autoevaluación!');
      } else {
        alert('Error al enviar respuestas');
      }
    } catch (err) {
      console.error("Error al enviar respuestas:", err);
      alert('Error de red');
    }
  };

  if (cargando) return <p className="text-center">Cargando preguntas...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Autoevaluación del Día</h2>

      {preguntas.map(({ id, texto }) => (
        <div key={id} className="mb-6">
          <p className="mb-2 font-medium">{texto}</p>
          <div className="flex space-x-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(valor => (
              <label key={valor} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name={`pregunta-${id}`}
                  value={valor}
                  checked={respuestas[id] === valor}
                  onChange={() => handleChange(id, valor)}
                  className="form-radio text-blue-600 h-5 w-5"
                />
                <span>{valor}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Enviar Respuestas
      </button>
    </form>
  );
};

export default Assestments;
