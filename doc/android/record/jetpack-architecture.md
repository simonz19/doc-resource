# Jetpack Architecture

## UML

package androidx.lifecycle;

- LiveData
  - MutableLiveData

* ViewModal

- ViewModelProviders

* LifecycleObserver
  - FullLifecycleObserver
    - DefaultLifecycleObserver

- LifecycleOwner
  - AppCompactActivity
  - Fragment

* Lifecycle
  - LifecycleRegistry

package androidx.databinding;

- @BindingAdapter

- DataBindingUtil

- Observable
  - BaseObservable
    - ViewDataBinding
    - BaseObservableField
      - ObservableField
        - ObservableParcelable<T>
      - ObservableBoolean
      - ObservableByte
      - ObservableShort
      - ObservableInt
      - ObservableLong
      - ObservableFloat
      - ObservableDouble
      - ObservableChar

* ObservableList
  - ObservableArrayList

- ObservableMap
  - ObservableArrayMap
