const API_URL = 'http://localhost:5256/api';

let pacientes = [];
let pacienteSeleccionado = null;

// Cargar pacientes al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarPacientes();
});

document.getElementById('pacienteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const paciente = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value
    };

    try {
        const response = await fetch(`${API_URL}/pacientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paciente)
        });

        if (response.ok) {
            mostrarMensaje('✓ Paciente creado', 'exito');
            document.getElementById('pacienteForm').reset();
            cargarPacientes();
        } else {
            mostrarMensaje('✗ Error al crear paciente', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('✗ Error de conexión', 'error');
    }
});

async function cargarPacientes() {
    try {
        const response = await fetch(`${API_URL}/pacientes`);
        if (response.ok) {
            pacientes = await response.json();
            mostrarPacientes();
        } else {
            mostrarMensaje('✗ Error al cargar pacientes', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('✗ Error de conexión', 'error');
    }
}

function mostrarPacientes() {
    const lista = document.getElementById('pacientesList');
    
    if (pacientes.length === 0) {
        lista.innerHTML = '<p style="color: #999; text-align: center;">No hay pacientes</p>';
        return;
    }

    lista.innerHTML = pacientes.map(p => `
        <div class="paciente-item" onclick="seleccionarPaciente(${p.id})">
            ${p.nombre}
        </div>
    `).join('');
}

function seleccionarPaciente(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) return;

    pacienteSeleccionado = paciente;

    // Actualizar UI
    document.querySelectorAll('.paciente-item').forEach(item => {
        item.classList.remove('activo');
    });
    event.target.closest('.paciente-item').classList.add('activo');

    // Mostrar detalles
    document.getElementById('detalleSection').style.display = 'block';
    document.getElementById('vacioSection').style.display = 'none';

    document.getElementById('detalleName').textContent = paciente.nombre || '-';
    document.getElementById('detallePhone').textContent = paciente.telefono || '-';
    document.getElementById('detalleEmail').textContent = paciente.email || '-';
}

function mostrarMensaje(texto, tipo) {
    const div = document.getElementById('mensaje');
    div.textContent = texto;
    div.className = `mensaje ${tipo}`;
    
    setTimeout(() => {
        div.className = 'mensaje';
    }, 3000);
}

