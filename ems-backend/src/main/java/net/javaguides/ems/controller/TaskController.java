package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Task;
import net.javaguides.ems.dto.TaskDto;
import net.javaguides.ems.mapper.TaskMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/tasks/")
public class TaskController {
  private EmployeeRepository employeeRepository;
  private TaskRepository taskRepository;

  // Get All Tasks
  @GetMapping("/tasks")
  public List<TaskDto> getAllTasks() {
    List<Task> tasks = taskRepository.findAll();
    return tasks.stream().map(TaskMapper::mapToTaskDto).collect(Collectors.toList());
  }

  // Create New Task
  @PostMapping("/tasks")
  public Task createTask(@RequestBody Task task) {
    return taskRepository.save(task);
  }

  // Get Task by ID
  @GetMapping("/tasks/{id}")
  public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id:" + id));

    return ResponseEntity.ok(TaskMapper.mapToTaskDto(task));
  }

  // Update Task by ID
  @PutMapping("/tasks/{id}")
  public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id:" + id));

    task.setTaskName(taskDetails.getTaskName());
    task.setTaskDescription(task.getTaskDescription());
    task.setAssignedEmployees(taskDetails.getAssignedEmployees());

    Task updateTask = taskRepository.save(task);

    return ResponseEntity.ok(TaskMapper.mapToTaskDto(updateTask));
  }

  // Delete Task by ID
  @DeleteMapping("/tasks/{id}")
  public Map<String, Boolean> deleteTask(@PathVariable Long id) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id:" + id));
    taskRepository.delete(task);
    Map<String, Boolean> response = new HashMap<>();
    response.put("Deleted", Boolean.TRUE);
    return response;
  }

  // Add Employee to Task by ID
  @PutMapping("/tasks/{taskId}/employees")
  public ResponseEntity<TaskDto> assignEmployeeToTask(@PathVariable Long taskId, @RequestBody Map<String, Long> data) {
    long employeeId = data.containsKey("employeeId") ? data.get("employeeId") : -1;

    Task task = taskRepository.findById(taskId)
        .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id:" + taskId));

    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id:" + employeeId));

    boolean assigned = task.assignEmployee(employee);
    Task updatedTask = taskRepository.save(task);
    if (assigned)
      return ResponseEntity.ok(TaskMapper.mapToTaskDto(updatedTask));
    else
      return ResponseEntity.badRequest().body(TaskMapper.mapToTaskDto(updatedTask));
  }

  // Remove Employee from Task
  @DeleteMapping("/tasks/{taskId}/employees/{employeeId}")
  public ResponseEntity<TaskDto> removeEmployeeFromTask(@PathVariable Long taskId, @PathVariable Long employeeId) {
    Task task = taskRepository.findById(taskId)
        .orElseThrow(() -> new ResourceNotFoundException("Task does not exist with id:" + taskId));

    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id:" + employeeId));

    boolean removed = task.removeEmployeeAssignment(employee);
    Task updatedTask = taskRepository.save(task);
    if (removed)
      return ResponseEntity.ok(TaskMapper.mapToTaskDto(updatedTask));
    else
      return ResponseEntity.badRequest().body(TaskMapper.mapToTaskDto(updatedTask));
  }
}
