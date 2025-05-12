import React, { useState } from 'react';

interface Respuestas {
  claridad: number;
  relevancia: number;
  satisfaccion: number;
  recomendacion: number;
}

const preguntas: { key: keyof Respuestas; texto: string }[] = [
  { key: 'claridad', texto: '¿Qué tan claras fueron las instrucciones proporcionadas?' },
  { key: 'relevancia', texto: '¿Qué tan relevante fue el contenido para tus necesidades?' },
  { key: 'satisfaccion', texto: '¿Qué tan satisfecho estás con la facilidad de uso del sistema?' },
  { key: 'recomendacion', texto: '¿Qué tan probable es que recomiendes esto a un colega?' },
];

const Assestments: React.FC = () => {
  const [respuestas, setRespuestas] = useState<Respuestas>({
    claridad: 0,
    relevancia: 0,
    satisfaccion: 0,
    recomendacion: 0,
  });

  const handleChange = (pregunta: keyof Respuestas, valor: number) => {
    setRespuestas(prev => ({ ...prev, [pregunta]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/respuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(respuestas),
      });
      if (resp.ok) {
        alert('¡Gracias! Tus respuestas han sido enviadas.');
      } else {
        console.error('Error al enviar:', resp.statusText);
        alert('Hubo un error al enviar tus respuestas.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error de red al enviar respuestas.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Cuestionario de Satisfacción</h2>

      {preguntas.map(({ key, texto }) => (
        <div key={key} className="mb-6">
          <p className="mb-2 font-medium">{texto}</p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map(valor => (
              <label key={valor} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name={key}
                  value={valor}
                  checked={respuestas[key] === valor}
                  onChange={() => handleChange(key, valor)}
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
        className="w-full bg-blue-600 text-black py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Enviar Respuestas
      </button>
    </form>
  );
};

export default Assestments;